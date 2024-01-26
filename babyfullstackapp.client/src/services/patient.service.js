import http from "../http-common";

class PatientDataService {
  getAll() {
    return http.get("/Patient");
  }

  get(id) {
    return http.get(`/Patient/${id}`);
  }

  create(data) {
    return http.post("/Patient", data);
  }

  update(id, data) {
    return http.put(`/Patient/${id}`, data);
  }

  delete(id) {
    return http.delete(`/Patient/${id}`);
  }

  findByName(name) {
    return http.get(`/Patient?name=${name}`);
  }
}

export default new PatientDataService();