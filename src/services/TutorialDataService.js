// axios 사용법 (get, post, put, delete )
// ex) get 방식 : axios.get('/user/12345')
// ex) post 방식 : axios.post('/user',{id:'aa', name: 'wing'}})
// axios.post('/user, {id:'aa', name: 'wing'}')
// .then(function(res){
//     성공하면 then 들어옴
// })
// .catch(function(error){
//     실패하면 catch 들어옴
// })

import http from "../http-common";

// js class 
class TutorialDataService{
    // tutorials 전체 목록 조회 메소드 (스프링으로 요청)
    // axios -> spring 데이터 요청 -> spring -> db -> 결과 반환 
    getAll(){
        return http.get("/tutorials");
    }
    // id 로 조회하는 메소드 (getid)
    get(id){
        return http.get(`/tutorials/${id}`)
    }
    // tutorial 데이터 추가 메소드 
    create(data){
        return http.post("/tutorials",data)
    }
    // tutorial 데이터 수정 메소드 
    update(id, data){
        return http.put(`/tutorials/${id}`,data);
    }
    // tutorial 데이터 삭제(수정) 메소드
    delete(id){
        return http.put(`/tutorials/deletion/${id}`);
    }
    // tutorial 모든 데이터 삭제(수정) 메소드
    deleteAll(){
        return http.put(`/tutorials/deletion`);
    }
    // tutorial 데이터 중에 title(제목)을 기분으로 검색 메소드 
    findByTItle(title){
        return http.get(`tutorials?title=${title}`)
    }
}

//export:  모듈을 다른 자바스크립트 파일에서 참조 
// new 모듈명 : class 객체 생성을 위해 new 사용함 
export default new TutorialDataService();