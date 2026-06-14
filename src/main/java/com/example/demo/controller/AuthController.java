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
import com.example.demo.security.JwtUtil;
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
    //IPPUDE CHANGE CHESINAM
//    @PostMapping("/register")
//    public User register(@RequestBody User user) {
//        user.setPassword(encoder.encode(user.getPassword()));
//        user.setRole("USER");
//        user.setActive(true);
//        return userRepository.save(user);
//    }

    @PostMapping("/register")
    public User register(@RequestBody User user) {

        user.setPassword(encoder.encode(user.getPassword()));

        if (user.getRole() == null || user.getRole().isEmpty()) {
            user.setRole("ROLE_RECEPTIONIST");
        }

        if (user.getRole().equals("ROLE_ADMIN")) {
            user.setRole("ROLE_RECEPTIONIST");
        }

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

//    @PostMapping("/login")
//    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
//
//        String email = body.get("email");
//        String password = body.get("password");
////        String role = body.get("role");
//
//        User user = userRepository.findByEmail(email)
//                .orElseThrow(() -> new RuntimeException("User not found"));
//
//        if (!encoder.matches(password, user.getPassword())) {
//            return ResponseEntity.status(401).body("Invalid credentials");
//        }
//        return ResponseEntity.ok(user);
//    }
@PostMapping("/login")
public ResponseEntity<?> login(@RequestBody Map<String, String> body) {

    String email = body.get("email");
    String password = body.get("password");

    User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));

    System.out.println("Email from request: " + email);
    System.out.println("Password from request: " + password);
    System.out.println("User found: " + user.getEmail());
    System.out.println("Password in DB: " + user.getPassword());

    boolean match = encoder.matches(password, user.getPassword());
    System.out.println("Password Match: " + match);

    if (!encoder.matches(password, user.getPassword())) {
        return ResponseEntity.status(401).body("Invalid credentials");
    }

    // 🔥 GENERATE JWT TOKEN
    String token = JwtUtil.generateToken(user.getEmail(), user.getRole());

    // 🔥 RETURN TOKEN + USER INFO
    return ResponseEntity.ok(Map.of(
            "token", token,
            "role", user.getRole(),
            "email", user.getEmail(),
            "username", user.getUsername(),
            "id", user.getId()
    ));
}

}
