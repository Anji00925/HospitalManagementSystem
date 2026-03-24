//package com.example.demo.controller;
//
//import com.example.demo.entity.User;
//import com.example.demo.repository.UserRepository;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.Map;
//
//@RestController
//@RequestMapping("/api/auth")
//@CrossOrigin
//public class AuthController {
//
//    private final UserRepository userRepository;
//    private final BCryptPasswordEncoder encoder;
//
//    public AuthController(UserRepository userRepository,
//                          BCryptPasswordEncoder encoder) {
//        this.userRepository = userRepository;
//        this.encoder = encoder;
//    }
//
//    @PostMapping("/register")
//    public User register(@RequestBody User user) {
//        user.setPassword(encoder.encode(user.getPassword()));
//        user.setRole("USER");
//        user.setActive(true);
//        return userRepository.save(user);
//    }
//
//    @PostMapping("/login")
//    public Map<String, String> login(@RequestBody User req) {
//        User user = userRepository.findByEmail(req.getEmail())
//                .orElseThrow(() -> new RuntimeException("Invalid"));
//
//        if (!encoder.matches(req.getPassword(), user.getPassword())) {
//            throw new RuntimeException("Invalid");
//        }
//
//        return Map.of("token", "dummy-token-for-now");
//    }
//
//}

package com.example.demo.controller;

import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder encoder;

    public AuthController(UserRepository userRepository,
                          BCryptPasswordEncoder encoder) {
        this.userRepository = userRepository;
        this.encoder = encoder;
    }

    // ✅ REGISTER
    @PostMapping("/register")
    public User register(@RequestBody User user) {
        user.setPassword(encoder.encode(user.getPassword()));
        user.setRole("USER");
        user.setActive(true);
        return userRepository.save(user);
    }

    // ✅ LOGIN
//    @PostMapping("/login")
//    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
//
//        String email = body.get("email");
//        String password = body.get("password");
//
//        User user = userRepository.findByEmail(email)
//                .orElseThrow(() -> new RuntimeException("User not found"));
//
//        if (!encoder.matches(password, user.getPassword())) {
//            return ResponseEntity.status(401).body("Invalid credentials");
//        }
//
//        return ResponseEntity.ok(user);
//    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {

        String email = body.get("email");
        String password = body.get("password");

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!encoder.matches(password, user.getPassword())) {
            return ResponseEntity.status(401).body("Invalid credentials");
        }

//        return ResponseEntity.ok(Map.of(
//                "id", user.getId(),
//                "username", user.getUsername(),
//                "email", user.getEmail(),
//                "role", user.getRole()
//        ));
        return ResponseEntity.ok(user);
    }

}
