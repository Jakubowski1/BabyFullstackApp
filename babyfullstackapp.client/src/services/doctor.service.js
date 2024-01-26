import http from "../http-common";

class DoctorDataService {
  getAll() {
    return http.get("/Doctor");
  }

  get(id) {
    return http.get(`/Doctor/${id}`);
  }

  create(data) {
    return http.post("/Doctor", data);
  }

  update(id, data) {
    return http.put(`/Doctor/${id}`, data);
  }

  delete(id) {
    return http.delete(`/Doctor/${id}`);
  }

  deleteAll() {
    return http.delete(`/Doctor`);
  }

  findByTitle(title) {
    return http.get(`/Doctor?title=${title}`);
  }
}

export default new DoctorDataService();