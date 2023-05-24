package com.example.ProjetoIntegradorI.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor

@Entity
@Table(name = "Imagens")

public class ImagensModel {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;


    private String tituloImagem;
    private String urlImagem;

    public ImagensModel(Long id, String tituloImagem, String urlImagem) {
        this.id = id;
        this.tituloImagem = tituloImagem;
        this.urlImagem = urlImagem;
    }
}
