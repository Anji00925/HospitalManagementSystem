package com.example.demo.ai;

import okhttp3.MediaType;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.client.SimpleClientHttpRequestFactory;

import java.util.Map;

import okhttp3.*;

@Service
public class GeminiService {

    @Value("${gemini.api.key}")
    private String apiKey;

    public String analyzeSymptoms(String symptoms) {

        String url =
                "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key="
                        + apiKey;

        String prompt = """
                You are an AI Hospital Assistant.

                Analyze the symptoms provided by the user.

                Respond like a medical assistant in a friendly conversational style.

                Do NOT use markdown.
                Do NOT use bullet points.
                Do NOT answer non-medical questions.

                Symptoms:
                """ + symptoms;

        Map<String, Object> requestBody = Map.of(
                "contents",
                new Object[]{
                        Map.of(
                                "parts",
                                new Object[]{
                                        Map.of("text", prompt)
                                }
                        )
                }
        );

        try {

            OkHttpClient client = new OkHttpClient();

            String json = """
    {
      "contents": [{
        "parts": [{
          "text": "%s"
        }]
      }]
    }
    """.formatted(prompt.replace("\"", "\\\""));

            RequestBody body = RequestBody.create(
                    json,
                    MediaType.parse("application/json")
            );

            Request request = new Request.Builder()
                    .url(url)
                    .post(body)
                    .build();

            Response response = client.newCall(request).execute();

            String responseBody = response.body().string();

            System.out.println(responseBody);

            return responseBody;

        } catch (Exception e) {
            e.printStackTrace();
            return "Unable to connect to AI service.";
        }
    }
}