package com.example.ProjetoIntegradorI.services.impl;

import com.example.ProjetoIntegradorI.models.CategoriaModel;
import com.example.ProjetoIntegradorI.models.CidadesModel;
import com.example.ProjetoIntegradorI.models.UsuarioModel;
import com.example.ProjetoIntegradorI.repositories.CategoriaRepository;
import com.example.ProjetoIntegradorI.repositories.CidadesRepository;
import com.example.ProjetoIntegradorI.repositories.UsuarioRepository;
import com.example.ProjetoIntegradorI.services.IBookingService;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

@Service
public class CidadesServiceImpl implements IBookingService<CidadesModel> {

    private final CidadesRepository cidadesRepository;

    public CidadesServiceImpl(CidadesRepository cidadesRepository) { this.cidadesRepository = cidadesRepository; }

    @Override
    public CidadesModel salvar(CidadesModel cidadesModel) {
        if(cidadesModel != null){
            return cidadesRepository.save(cidadesModel);
        }
        return new CidadesModel();
    }


    @Override
    public String alterar(CidadesModel cidadesModel) {
        if(cidadesModel != null && cidadesRepository.findById(cidadesModel.getId()).isPresent()){
            cidadesRepository.saveAndFlush(cidadesModel);
            return "Cidade alterada com sucesso!";
        }
        return "Não foi possível alterar os dados da cidade.";
    }

    @Override
    public List<CidadesModel> buscarTodos() throws SQLException {
        return cidadesRepository.findAll();
    }

    @Override
    public Optional<CidadesModel> buscarPorId(Long id) throws SQLException {
        return cidadesRepository.findById(id);
    }

    @Override
    public boolean excluir(Long id) throws SQLException {
        if(cidadesRepository.findById(id).isPresent()){
            cidadesRepository.deleteById(id);
            return true;
        }
        return false;
    }

}