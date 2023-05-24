package com.example.ProjetoIntegradorI.services.impl;

import com.example.ProjetoIntegradorI.exceptions.ResourceNotFoundException;
import com.example.ProjetoIntegradorI.models.CategoriaModel;
import com.example.ProjetoIntegradorI.models.CidadesModel;
import com.example.ProjetoIntegradorI.models.ImagensModel;
import com.example.ProjetoIntegradorI.models.ProdutosModel;
import com.example.ProjetoIntegradorI.repositories.ImagensRepository;
import com.example.ProjetoIntegradorI.services.IBookingService;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

@Service
public class ImagensServiceImpl implements IBookingService<ImagensModel> {
    private final ImagensRepository imagensRepository;
    public ImagensServiceImpl(ImagensRepository imagensRepository) {
        this.imagensRepository = imagensRepository;
    }

    @Override
    public ImagensModel salvar(ImagensModel imagensModel) {
        if (imagensModel != null) {
            return imagensRepository.save(imagensModel);
        }
        return new ImagensModel();
    }

    @Override
    public String alterar(ImagensModel imagensModel) {
        if (imagensModel != null && imagensRepository.findById(imagensModel.getId()).isPresent()) {
            imagensRepository.saveAndFlush(imagensModel);
            return "Produto alterado com sucesso!";
        }
        return "Não foi possível alterar o produto.";
    }

    @Override
    public List<ImagensModel> buscarTodos() throws SQLException {
        return imagensRepository.findAll();
    }

    @Override
    public Optional<ImagensModel> buscarPorId(Long id) throws SQLException {
        return imagensRepository.findById(id);
    }

    @Override
    public boolean excluir(Long id) throws SQLException {
        if (imagensRepository.findById(id).isPresent()) {
            imagensRepository.deleteById(id);
            return true;
        }
        return false;
    }

}
