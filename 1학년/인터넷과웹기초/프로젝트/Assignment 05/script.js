document.addEventListener("DOMContentLoaded", () => {
    const searchKeywordInput = document.getElementById("search-keyword");
    const searchButton = document.getElementById("search-button");
    const newsResultsDiv = document.getElementById("news-results");
    const selectedNewsContentDiv = document.getElementById("selected-news-content");
    const summarizeButton = document.getElementById("summarize-button");
    const newsSummaryDiv = document.getElementById("news-summary");
    const recommendedNewsDiv = document.getElementById("recommended-news");

    // OpenAI API 키는 클라이언트 사이드에서 직접 사용될 경우 여기에 입력합니다.
    const OPENAI_API_KEY = "YOUR_OPENAI_API_KEY_HERE"; // <--- OpenAI API 키를 여기에 입력하세요.
    // News API 키는 이제 백엔드 프록시 서버에서 환경 변수로 관리됩니다.

    let currentNewsArticles = [];
    let selectedArticleForSummary = null;

    // 1. 뉴스 검색 기능 (프록시 서버 사용)
    searchButton.addEventListener("click", async () => {
        const keyword = searchKeywordInput.value.trim();
        if (!keyword) {
            alert("검색어를 입력해주세요.");
            return;
        }

        newsResultsDiv.innerHTML = "<p>뉴스를 검색 중입니다...</p>";
        selectedNewsContentDiv.innerHTML = "";
        newsSummaryDiv.innerHTML = "";
        summarizeButton.style.display = "none";
        recommendedNewsDiv.innerHTML = "";

        try {
            // 프록시 서버를 통해 News API 호출
            const response = await fetch(`http://localhost:5000/api/news?keyword=${encodeURIComponent(keyword)}`);
            
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ error: "Unknown error from proxy" }));
                throw new Error(`HTTP error! status: ${response.status} - ${errorData.error || response.statusText}`);
            }
            const data = await response.json();
            currentNewsArticles = data.articles || [];

            if (currentNewsArticles.length === 0) {
                newsResultsDiv.innerHTML = "<p>검색된 뉴스가 없습니다.</p>";
                return;
            }

            renderNewsResults(currentNewsArticles);
        } catch (error) {
            console.error("뉴스 검색 중 오류 발생:", error);
            newsResultsDiv.innerHTML = `<p>뉴스 검색 중 오류가 발생했습니다: ${error.message}</p>`;
        }
    });

    function renderNewsResults(articles) {
        newsResultsDiv.innerHTML = "";
        articles.forEach((article, index) => {
            const articleElement = document.createElement("article");
            articleElement.innerHTML = `
                <h3>${article.title}</h3>
                <p>${article.description || "내용 미리보기 없음"}</p>
                <p><small>출처: ${article.source?.name || "정보 없음"} | 게시일: ${new Date(article.publishedAt).toLocaleString()}</small></p>
                <button class="view-full-article-btn" data-index="${index}">전체 기사 보기</button>
            `;
            newsResultsDiv.appendChild(articleElement);
        });

        document.querySelectorAll(".view-full-article-btn").forEach(button => {
            button.addEventListener("click", (event) => {
                const articleIndex = parseInt(event.target.dataset.index);
                displayFullArticle(currentNewsArticles[articleIndex]);
            });
        });
    }

    function displayFullArticle(article) {
        selectedArticleForSummary = article;
        selectedNewsContentDiv.innerHTML = `
            <h3>${article.title}</h3>
            <p>${article.content || article.description || "전체 내용 없음"}</p>
            <p><a href="${article.url}" target="_blank">원문 기사 링크</a></p>
        `;
        summarizeButton.style.display = "block";
        newsSummaryDiv.innerHTML = ""; // 이전 요약 내용 초기화
        // 선택된 뉴스에 맞춰 추천 뉴스 업데이트 (프록시 사용)
        const firstKeyword = article.title.split(" ")[0] || "뉴스";
        recommendNewsBasedOn(firstKeyword);
    }

    // 2. 뉴스 자동 요약 기능 (OpenAI API - 현재 클라이언트 직접 호출 방식 유지)
    summarizeButton.addEventListener("click", async () => {
        if (!selectedArticleForSummary) {
            alert("요약할 뉴스를 먼저 선택해주세요.");
            return;
        }

        if (OPENAI_API_KEY === "YOUR_OPENAI_API_KEY_HERE") {
            alert("OpenAI API 키를 script.js 파일에 입력해주세요.");
            newsSummaryDiv.innerHTML = "<p>OpenAI API 키가 설정되지 않았습니다. script.js 파일을 확인해주세요.</p>";
            return;
        }

        newsSummaryDiv.innerHTML = "<p>뉴스를 요약 중입니다...</p>";
        const textToSummarize = selectedArticleForSummary.content || selectedArticleForSummary.description;

        try {
            // OpenAI API 호출 (실제 API 연동 시 주석 해제 및 수정)
            // 현재는 더미 데이터 사용
            // const response = await fetch("https://api.openai.com/v1/chat/completions", {
            //     method: "POST",
            //     headers: {
            //         "Content-Type": "application/json",
            //         "Authorization": `Bearer ${OPENAI_API_KEY}`
            //     },
            //     body: JSON.stringify({
            //         model: "gpt-3.5-turbo",
            //         messages: [
            //             { role: "system", content: "You are a helpful assistant that summarizes news articles." },
            //             { role: "user", content: `다음 뉴스 기사를 요약해주세요: ${textToSummarize}` }
            //         ],
            //         max_tokens: 150
            //     })
            // });
            // if (!response.ok) {
            //     const errorData = await response.json();
            //     throw new Error(`OpenAI API error! status: ${response.status}, message: ${errorData.error?.message}`);
            // }
            // const data = await response.json();
            // const summary = data.choices[0]?.message?.content.trim();

            // 임시 더미 데이터 (OpenAI API 실제 연동 전 테스트용)
            await new Promise(resolve => setTimeout(resolve, 1500));
            const summary = `[요약된 내용] ${selectedArticleForSummary.title}에 대한 요약입니다. (OpenAI API 연동 시 실제 요약으로 대체됩니다.)`;

            if (summary) {
                newsSummaryDiv.innerHTML = `<p>${summary}</p>`;
            } else {
                newsSummaryDiv.innerHTML = "<p>뉴스를 요약할 수 없습니다.</p>";
            }
        } catch (error) {
            console.error("뉴스 요약 중 오류 발생:", error);
            newsSummaryDiv.innerHTML = `<p>뉴스 요약 중 오류가 발생했습니다: ${error.message}</p>`;
        }
    });

    // 3. 맞춤형 뉴스 추천 기능 (프록시 서버 사용)
    async function recommendNewsBasedOn(keyword) {
        recommendedNewsDiv.innerHTML = `<p>\"${keyword}\" 관련 추천 뉴스를 검색 중입니다...</p>`;
        try {
            // 프록시 서버를 통해 News API 호출 (추천용)
            const response = await fetch(`http://localhost:5000/api/news?keyword=${encodeURIComponent(keyword)}&pageSize=3`);
            
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ error: "Unknown error from proxy" }));
                throw new Error(`HTTP error! status: ${response.status} - ${errorData.error || response.statusText}`);
            }
            const data = await response.json();
            const recommendedArticles = data.articles || [];

            if (recommendedArticles.length === 0) {
                recommendedNewsDiv.innerHTML = "<p>추천할 만한 뉴스가 없습니다.</p>";
                return;
            }

            recommendedNewsDiv.innerHTML = "";
            recommendedArticles.forEach(article => {
                const articleElement = document.createElement("article");
                articleElement.innerHTML = `
                    <h3>${article.title}</h3>
                    <p>${article.description || "내용 미리보기 없음"}</p>
                    <p><small>출처: ${article.source?.name || "정보 없음"} | 게시일: ${new Date(article.publishedAt).toLocaleString()}</small></p>
                    <p><a href="${article.url}" target="_blank">기사 읽기</a></p>
                `;
                recommendedNewsDiv.appendChild(articleElement);
            });

        } catch (error) {
            console.error("추천 뉴스 검색 중 오류 발생:", error);
            recommendedNewsDiv.innerHTML = `<p>추천 뉴스 검색 중 오류가 발생했습니다: ${error.message}</p>`;
        }
    }
});

