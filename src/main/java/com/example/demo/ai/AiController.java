package com.example.demo.ai;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin
public class AiController {

    @Autowired
    private GeminiService geminiService;

    @PostMapping("/analyze")
    public String analyze(@RequestBody SymptomRequest request) {

        System.out.println("AI ENDPOINT HIT");

        return geminiService.analyzeSymptoms(
                request.getSymptoms()
        );
    }
}