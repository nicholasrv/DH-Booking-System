package com.example.ProjetoIntegradorI.services.impl;

import com.example.ProjetoIntegradorI.models.CategoriaModel;
import com.example.ProjetoIntegradorI. repositories.CategoriaRepository;
import com.example.ProjetoIntegradorI.services.IBookingService;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

@Service
public class CategoriaServiceImpl implements IBookingService<CategoriaModel> {

    private final CategoriaRepository categoriaRepository;

    public CategoriaServiceImpl(CategoriaRepository categoriaRepository) { this.categoriaRepository = categoriaRepository; }

    @Override
    public CategoriaModel salvar(CategoriaModel categoriaModel) {
        if(categoriaModel != null){
            return categoriaRepository.save(categoriaModel);
        }
        return new CategoriaModel();
    }


    @Override
    public String alterar(CategoriaModel categoriaModel) {
        if(categoriaModel != null && categoriaRepository.findById(categoriaModel.getId()).isPresent()){
            categoriaRepository.saveAndFlush(categoriaModel);
            return "Categoria alterada com sucesso!";
        }
        return "Não foi possível alterar os dados da categoria.";
    }

    @Override
    public List<CategoriaModel> buscarTodos() throws SQLException {
        return categoriaRepository.findAll();
    }

    @Override
    public Optional<CategoriaModel> buscarPorId(Long id) throws SQLException {
        return categoriaRepository.findById(id);
    }

    @Override
    public boolean excluir(Long id) throws SQLException {
        if(categoriaRepository.findById(id).isPresent()){
            categoriaRepository.deleteById(id);
            return true;
        }
        return false;
    }

}
