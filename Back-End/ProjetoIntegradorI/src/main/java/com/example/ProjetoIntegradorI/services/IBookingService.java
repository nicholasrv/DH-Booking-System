package com.example.ProjetoIntegradorI.services;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

public interface IBookingService<T> {

    public T salvar (T t);

    public String alterar (T t);

    public List<T> buscarTodos() throws SQLException;

    public Optional<T> buscarPorId(Long id) throws SQLException;

    public boolean excluir (Long id) throws SQLException;

}
