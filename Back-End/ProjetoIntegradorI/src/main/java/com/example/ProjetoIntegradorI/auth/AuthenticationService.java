package com.example.ProjetoIntegradorI.auth;

import com.example.ProjetoIntegradorI.config.JwtService;
import com.example.ProjetoIntegradorI.models.Role;
import com.example.ProjetoIntegradorI.models.UsuarioModel;
import com.example.ProjetoIntegradorI.repositories.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    private final JwtService jwtService;

    public AuthenticationResponse register(RegisterRequest request) {
        var user = UsuarioModel.builder()
                .nome(request.getFirstname())
                .sobrenome(request.getLastname())
                .email(request.getEmail())
                .senha(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();
        usuarioRepository.save(user);
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public AuthenticationResponse registerAdmin(RegisterRequest request) {
        var user = UsuarioModel.builder()
                .nome(request.getFirstname())
                .sobrenome(request.getLastname())
                .email(request.getEmail())
                .senha(passwordEncoder.encode(request.getPassword()))
                .role(Role.ADMIN)
                .build();
        usuarioRepository.save(user);
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request){
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var user = usuarioRepository.findByEmail(request.getEmail())
                .orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .id(user.getId())
                .name(user.getNome())
                .surname(user.getSobrenome())
                .email(user.getEmail())
                .build();
    }
}
