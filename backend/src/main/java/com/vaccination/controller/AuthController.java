package com.vaccination.controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import com.vaccination.repo.UserRepository;
import com.vaccination.model.User;
import com.vaccination.security.JwtUtil;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
  private final UserRepository userRepo;
  private final JwtUtil jwtUtil;
  private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

  public AuthController(UserRepository userRepo, JwtUtil jwtUtil){ this.userRepo=userRepo; this.jwtUtil=jwtUtil; }

  @PostMapping("/signup")
  public ResponseEntity<?> signup(@RequestBody User u) {
    if(userRepo.findByEmail(u.getEmail()).isPresent()) return ResponseEntity.badRequest().body("Email already used");
    u.setPassword(encoder.encode(u.getPassword()));
    if(u.getRole()==null) u.setRole("ROLE_USER");
    userRepo.save(u);
    return ResponseEntity.ok("User created");
  }

  @PostMapping("/login")
  public ResponseEntity<?> login(@RequestBody LoginRequest req){
    var userOpt = userRepo.findByEmail(req.email);
    if(userOpt.isEmpty()) return ResponseEntity.status(401).body("Invalid credentials");
    var user = userOpt.get();
    if(!encoder.matches(req.password, user.getPassword())) return ResponseEntity.status(401).body("Invalid credentials");
    var token = jwtUtil.generateToken(user.getEmail(), user.getRole());
    return ResponseEntity.ok(new AuthResponse(token, user.getRole()));
  }

  static record LoginRequest(String email, String password){}
  static record AuthResponse(String token, String role){}
}
