package com.example.ProjetoIntegradorI.services;

import com.example.ProjetoIntegradorI.models.CategoriaModel;
import com.example.ProjetoIntegradorI.models.CidadesModel;

import java.sql.SQLException;
import java.util.List;

public interface TesteImpl<T> {
    public List<T> buscarPorCategoria(CategoriaModel categoriaModel) throws SQLException;

    public List<T> buscarPorCidade(CidadesModel cidadesModel) throws SQLException;

}
