<template>
  <div class="list row">
      <!-- search 관련 div 시작 -->
      <div class="col-md-8">
          <div class="input-group mb-3">
              <!-- 검색 입력 박스 -->
              <input type="text"
                    class="form-control"
                    placeholder="Search by title"
                    v-model="title">
              <!-- 검색 버튼 -->
              <div class="input-group-append">
                  <button class="btn btn-outline-secondary"
                        type="button"
                        @click="searchTitle"
                  >
                        Search
                  </button>
              </div>
          </div>
      </div>
      <!-- search 관련 div 끝 -->

      <!-- 목록을 보여주는 div 시작 -->
      <!-- vue 에 있는 active 디자인 클래스 : 참(true)일 때만 보인다 -->
      <div class="col-md-6">
          <h4>Tutorials List</h4>
          <!-- 제목 목록 -->
          <ul class="list-group">
              <li class="list-group-item"
                :class="{ active: index == currentIndex }"
                v-for="(tutorial, index) in tutorials"
                :key="index"
                @click="setActiveTutorial(tutorial, index)"
                >
                {{ tutorial.title }}
              </li>
          </ul>
          <!-- 모든 목록 삭제 버튼 -->
          <button class="m-3 btn btn-sm btn-danger"
                @click="removeAllTutorials">
              Remove All
          </button>
      </div>
      <!-- 목록을 보여주는 div 끝 -->

      <!-- 상세 정보를 보여주는 div 시작 -->
      <div class="col-md-6">
          <!-- currentTutorial != null 이면 -->
          <div v-if="currentTutorial">
              <h4>Tutorial</h4>
              <div>
                  <label><strong>Title:</strong></label>
                    {{ currentTutorial.title }}
              </div>
              <div>
                  <label><strong>Description:</strong></label>
                    {{ currentTutorial.description }}
              </div>
              <div>
                  <label><strong>Status:</strong></label>
                    {{ (currentTutorial.published == "Y") ? "Published" : "Pending" }}
              </div>

              <!-- link 추가 -->
              <router-link :to="'/tutorials/' + currentTutorial.id"
                            class="badge badge-primary"
              >
                Edit
              </router-link> 
          </div>
          <!-- currentTutorial == null 이면 -->
          <div v-else>
              <br>
              <p>Please click on a Tutorial...</p>
          </div>
      </div>
      <!-- 상세 정보를 보여주는 div 끝 -->
  </div>
</template>

<script>
import TutorialDataService from '@/services/TutorialDataService';
export default {
    name: "tutorials-list",
    data() {
        // tutorials 객체와 변수들 초기화
        return {
            tutorials: [],
            currentTutorial: null,
            currentIndex: -1,
            title: ""
        };
    },
    methods: {
        // 전체 목록 조회
        retrieveTutorials() {
            // 백엔드(spring) 쪽으로 전체 데이터 요청
            TutorialDataService.getAll()
            // 성공하면 .then 으로 들어옴
            // response : 헤더(상태정보, 쿠키 등), 바디(json)
            // response 안에 html의 header 와 body(데이터 다 들어있는 body), 상태정보 등 다 있음
            // 밑에 있는 data 안에는 tutorial 객체가 들어 있음 (백엔드에서 전송됨)
            // 메소드의 매개변수는 이름 아무거나 써도 됨 -> response (강사님이 직관적으로 사용한 것)
            .then( response => {
                this.tutorials = response.data
                // 데이터 잘 들어왔는지 로그 확인
                console.log(response.data);
            })
            // 실패하면 .catch 로 들어와서 에러 출력
            // 메소드의 매개변수는 이름 아무거나 써도 됨 -> e 도 좋고 error 도 좋고 err 도 좋고
            .catch( e => {
                console.log(e);
            })
            
        },
        // 목록 삭제 후 화면 다시 로딩할 때 사용할 메소드
        // 새로고침 메소드
        refreshList() {
            this.currentTutorial = null;
            this.currentIndex = -1;
            this.retrieveTutorials();
        },
        // vue 의 data 변수에 값을 저장하는 메소드
        // 클릭했을 때 현재 값을 저장함
        // 클릭한 대상(객체)에 대한 상세 보기를 보여주는 메소드
        setActiveTutorial(tutorial, index) {
            this.currentTutorial = tutorial;
            this.currentIndex = index;
        },
        // 모든 목록 삭제 메소드
        // @PutMapping("/tutorials") public ResponseEntity<HttpStatus> deleteAllTutorial()
        removeAllTutorials() {
            // 백엔드(spring)쪽으로 전체 데이터 삭제 요청
            TutorialDataService.deleteAll()
            // 성공하면 .then 으로 들어옴
            .then( response => {
                console.log(response.data);
                // 모든 데이터를 삭제했으므로 새로고침 메소드 호출
                this.refreshList();
            })
            // 실패하면 .catch 로 들어와서 에러 출력
            .catch( e => {
                console.log(e);
            })
        },
        // 제목 검색을 위한 메소드
        searchTitle() {
            // 백엔드(spring)쪽으로 제목(title) 데이터 조회를 요청 - 게시글의 제목을 가져오는 것
            TutorialDataService.findByTitle(this.title)
            // 성공하면 .then 으로 들어옴
            .then( response => {
                // 백엔드(spring) 쪽에서 받은 데이터를 vue의 data 변수(tutorial)에 넣음
                this.tutorials = response.data
                // 데이터 잘 들어왔는지 로그 확인 
                console.log(response.data);
            })
            // 실패하면 .catch 로 들어와서 에러 출력
            .catch( e => {
                console.log(e);
            })
        }
    },
    // 최초 화면이 로딩될 때 (뜰 때) 실행되는 vue 이벤트
    mounted() {
        // 전체 목록 가져오기 메소드를 호출
        this.retrieveTutorials();
    }
}
</script>

<style>
    .list {
        text-align: left;
        max-width: 750px;
        margin: auto;
    }
</style>