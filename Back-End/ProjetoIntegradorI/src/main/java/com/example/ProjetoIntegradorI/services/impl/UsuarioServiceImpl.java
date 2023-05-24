package com.example.ProjetoIntegradorI.services.impl;

import com.example.ProjetoIntegradorI.models.UsuarioModel;
import com.example.ProjetoIntegradorI. repositories.UsuarioRepository;
import com.example.ProjetoIntegradorI.services.IBookingService;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

@Service
public class UsuarioServiceImpl implements IBookingService<UsuarioModel> {
    private final UsuarioRepository usuarioRepository;

    public UsuarioServiceImpl(UsuarioRepository usuarioRepository) { this.usuarioRepository = usuarioRepository; }

    @Override
    public UsuarioModel salvar(UsuarioModel usuarioModel) {
        if(usuarioModel != null){
            return usuarioRepository.save(usuarioModel);
        }
        return new UsuarioModel();
    }


    @Override
    public String alterar(UsuarioModel usuarioModel) {
        if(usuarioModel != null && usuarioRepository.findById(usuarioModel.getId()).isPresent()){
            usuarioRepository.saveAndFlush(usuarioModel);
            return "Usuário alterado com sucesso!";
        }
        return "Não foi possível alterar os dados do usuário.";
    }

    @Override
    public List<UsuarioModel> buscarTodos() throws SQLException {
        return usuarioRepository.findAll();
    }

    @Override
    public Optional<UsuarioModel> buscarPorId(Long id) throws SQLException {
        return usuarioRepository.findById(id);
    }

    @Override
    public boolean excluir(Long id) throws SQLException {
        if(usuarioRepository.findById(id).isPresent()){
            usuarioRepository.deleteById(id);
            return true;
        }
        return false;
    }


}
