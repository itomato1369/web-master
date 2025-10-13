document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.getElementById('story-list-body');
    const storyCountSpan = document.getElementById('story-count');
    
    // 💡 검색 관련 UI 요소들만 남김
    const searchNameInput = document.getElementById('search-name'); 
    const searchButton = document.getElementById('search-button');   
    const resetButton = document.getElementById('reset-button');     
    
    // 1. 서버에 데이터 요청 및 목록 렌더링 함수 (페이징 제거됨)
    function fetchStories() {
        tableBody.innerHTML = '<tr><td colspan="9" class="loading" style="text-align:center;">데이터 로딩 중...</td></tr>';
        
        // 현재 검색어 가져오기 (공백 제거)
        const searchQuery = searchNameInput.value.trim();
        
        // 쿼리 문자열 구성: 검색어가 있으면 name 파라미터만 추가
        let apiUrl = `/api/admin/stories?limit=99999`; // 페이징 대신 매우 큰 limit을 보내 전체 데이터를 요청
        if (searchQuery) {
            apiUrl += `&name=${encodeURIComponent(searchQuery)}`;
        }
        
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('네트워크 응답 오류: ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                tableBody.innerHTML = '';
                
                // 💡 서버는 totalCount와 stories를 반환하지만, 여기서는 stories만 사용합니다.
                const stories = data.stories || data; // 페이징 제거 버전에서도 작동하도록 data.stories || data 처리
                const totalCount = stories.length; // 목록 길이로 총 건수 계산
                
                storyCountSpan.textContent = `총 ${totalCount}건`;
                
                if (totalCount === 0) {
                    const noDataMessage = searchQuery ? 
                        `'${searchQuery}'(으)로 검색된 사연이 없습니다.` : 
                        `현재 응모된 사연이 없습니다.`;
                    tableBody.innerHTML = `<tr><td colspan="9" style="text-align:center;">${noDataMessage}</td></tr>`;
                    return;
                }

                stories.forEach(story => {
                    const contentSnippet = story.STORY_CONTENT ? story.STORY_CONTENT.substring(0, 100) + '...' : '내용 없음';
                    // 앞의 100글자만 따와서 미리보기
                    
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
                tableBody.innerHTML = `<tr><td colspan="9" style="color: red; text-align:center;">데이터 로드 실패: ${error.message}</td></tr>`;
            });
    }

    // =================================================================
    // 2. 이벤트 리스너 등록
    // 검색 버튼 클릭 이벤트
    searchButton.addEventListener('click', () => {
        fetchStories();
    });

    // 검색 초기화 버튼 클릭 이벤트
    resetButton.addEventListener('click', () => {
        searchNameInput.value = ''; // 입력 필드 비우기
        fetchStories();           // 전체 목록 로드
    });
    
    // Enter 키로 검색 가능
    searchNameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchButton.click();
        }
    });

    // 초기 로드: 전체 데이터 가져오기
    fetchStories();
});