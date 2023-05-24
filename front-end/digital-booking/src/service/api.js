import axios from "axios";

const api = axios.create(
    {baseURL:"http://devdigitalbooking-g6.projetos.app.br:8080/"}

);

export default api;