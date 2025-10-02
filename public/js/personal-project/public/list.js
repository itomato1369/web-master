document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.getElementById('story-list-body');
    const storyCountSpan = document.getElementById('story-count');
    
    // 서버의 새로운 API 엔드포인트에서 JSON 데이터를 가져옵니다.
    fetch('/api/admin/stories')
        .then(response => {
            if (!response.ok) {
                throw new Error('네트워크 응답 오류: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            tableBody.innerHTML = ''; // 로딩 메시지 제거
            storyCountSpan.textContent = `${data.length}건`;

            if (data.length === 0) {
                tableBody.innerHTML = '<tr><td colspan="9">현재 응모된 사연이 없습니다.</td></tr>';
                return;
            }

            data.forEach(story => {
                // DB에서 넘어온 컬럼명은 대문자입니다. (Oracle 기본)
                const contentSnippet = story.STORY_CONTENT ? story.STORY_CONTENT.substring(0, 100) + '...' : '내용 없음';
                
                const row = `
                    <tr>
                        <td>${story.STORY_ID}</td>
                        <td>${story.STORY_NAME}</td>
                        <td>${story.STORY_AGE || '-'}</td>
                        <td>${story.STORY_GENDER || '-'}</td>
                        <td title="${story.STORY_CONTENT}">${contentSnippet}</td>
                        <td>${story.GIFT_APPLY === 'Y' ? '✅' : '❌'}</td>
                        <td>${story.APPLICANT_NAME || '-'}</td>
                        <td>${story.APPLICANT_EMAIL || '-'}</td>
                        <td><a href="/admin/story/${story.STORY_ID}"><button>상세보기</button></a></td>
                    </tr>
                `;
                tableBody.insertAdjacentHTML('beforeend', row);
            });
        })
        .catch(error => {
            console.error('데이터 로드 실패:', error);
            tableBody.innerHTML = `<tr><td colspan="9" style="color: red;">데이터 로드 오류: ${error.message}</td></tr>`;
            storyCountSpan.textContent = '오류 발생';
        });
});