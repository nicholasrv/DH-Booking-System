package com.example.ProjetoIntegradorI.services.impl;

import com.example.ProjetoIntegradorI.models.CategoriaModel;
import com.example.ProjetoIntegradorI.models.FuncoesModel;
import com.example.ProjetoIntegradorI.repositories.FuncoesRepository;
import com.example.ProjetoIntegradorI.services.IBookingService;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

@Service
public class FuncoesServiceImpl implements IBookingService<FuncoesModel> {

    private final FuncoesRepository funcoesRepository;

    public FuncoesServiceImpl(FuncoesRepository funcoesRepository) { this.funcoesRepository = funcoesRepository; }

    @Override
    public FuncoesModel salvar(FuncoesModel funcoesModel) {
        if(funcoesModel != null){
            return funcoesRepository.save(funcoesModel);
        }
        return new FuncoesModel();
    }


    @Override
    public String alterar(FuncoesModel funcoesModel) {
        if(funcoesModel != null && funcoesRepository.findById(funcoesModel.getId()).isPresent()){
            funcoesRepository.saveAndFlush(funcoesModel);
            return "Categoria alterada com sucesso!";
        }
        return "Não foi possível alterar os dados da categoria.";
    }

    @Override
    public List<FuncoesModel> buscarTodos() throws SQLException {
        return funcoesRepository.findAll();
    }

    @Override
    public Optional<FuncoesModel> buscarPorId(Long id) throws SQLException {
        return funcoesRepository.findById(id);
    }

    @Override
    public boolean excluir(Long id) throws SQLException {
        if(funcoesRepository.findById(id).isPresent()){
            funcoesRepository.deleteById(id);
            return true;
        }
        return false;
    }

}

















