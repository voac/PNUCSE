import os
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app) # 모든 출처에서의 요청을 허용합니다. 실제 배포 시에는 특정 출처만 허용하도록 수정하는 것이 좋습니다.

# News API 키는 환경 변수에서 가져옵니다.
# 실행 전 터미널에서 `export NEWS_API_KEY='실제_NEWS_API_키'` 명령을 실행해야 합니다.
NEWS_API_KEY = os.environ.get("NEWS_API_KEY")

@app.route("/api/news", methods=["GET"])
def get_news():
    keyword = request.args.get("keyword")
    if not keyword:
        return jsonify({"error": "Keyword is required"}), 400

    if not NEWS_API_KEY:
        return jsonify({"error": "News API key is not configured on the server."}), 500

    try:
        # News API 엔드포인트 및 파라미터
        # language=ko 파라미터를 추가하여 한국어 뉴스를 우선적으로 가져옵니다.
        # pageSize를 추가하여 가져올 뉴스 개수를 제한할 수 있습니다 (예: pageSize=10)
        url = f"https://newsapi.org/v2/everything?q={requests.utils.quote(keyword)}&apiKey={NEWS_API_KEY}&language=ko&sortBy=publishedAt"
        
        response = requests.get(url)
        response.raise_for_status()  # HTTP 오류 발생 시 예외 발생
        
        news_data = response.json()
        return jsonify(news_data)

    except requests.exceptions.HTTPError as http_err:
        # News API에서 반환한 오류 메시지를 포함하여 클라이언트에 전달
        error_message = f"News API HTTP error: {http_err}"
        try:
            error_details = response.json() # API가 JSON 형태의 오류 메시지를 반환하는 경우
            if error_details and 'message' in error_details:
                error_message += f" - {error_details['message']}"
        except ValueError: # JSON 파싱 실패 시
            pass
        print(f"Error fetching news: {error_message}") # 서버 로그
        return jsonify({"error": error_message, "status_code": response.status_code}), response.status_code
    except requests.exceptions.RequestException as req_err:
        print(f"Error fetching news: {req_err}") # 서버 로그
        return jsonify({"error": f"Error connecting to News API: {req_err}"}), 503 # Service Unavailable
    except Exception as e:
        print(f"An unexpected error occurred: {e}") # 서버 로그
        return jsonify({"error": f"An unexpected error occurred: {e}"}), 500

if __name__ == "__main__":
    # 개발 환경에서는 0.0.0.0으로 모든 인터페이스에서 접속 가능하게 하고, 포트는 5000번을 사용합니다.
    # 실제 배포 시에는 Gunicorn과 같은 WSGI 서버를 사용하는 것이 좋습니다.
    app.run(host="0.0.0.0", port=5000, debug=True)

