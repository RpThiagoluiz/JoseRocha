package com.challenge.assets.controller;

import com.challenge.assets.AbstractIntegrationTest;
import com.challenge.assets.repository.AssetRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.UUID;

import static org.hamcrest.Matchers.containsString;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@AutoConfigureMockMvc
class AssetControllerIT extends AbstractIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private AssetRepository repository;

    private static final String VALID_JSON = """
            {
              "name": "Laptop Dell",
              "serialNumber": "SN-IT-001",
              "acquisitionDate": "2024-01-15T10:00:00Z"
            }
            """;

    @BeforeEach
    void cleanup() {
        repository.deleteAll();
    }

    @Test
    @DisplayName("POST /assets with valid JSON returns 201 and Location header")
    void post_valid_returns201AndLocation() throws Exception {
        mockMvc.perform(post("/assets")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(VALID_JSON))
                .andExpect(status().isCreated())
                .andExpect(header().string("Location", containsString("/assets/")))
                .andExpect(jsonPath("$.id").exists())
                .andExpect(jsonPath("$.name").value("Laptop Dell"))
                .andExpect(jsonPath("$.serialNumber").value("SN-IT-001"));
    }

    @Test
    @DisplayName("POST /assets with empty name returns 400 and code GEN-002")
    void post_validationError_returns400WithGen002() throws Exception {
        String invalidJson = """
                {
                  "name": "",
                  "serialNumber": "SN-002",
                  "acquisitionDate": "2024-01-15T10:00:00Z"
                }
                """;

        mockMvc.perform(post("/assets")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(invalidJson))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.code").value("GEN-002"))
                .andExpect(jsonPath("$.status").value(400));
    }

    @Test
    @DisplayName("POST /assets with duplicate serial returns 409 and code AST-002")
    void post_duplicateSerial_returns409WithAst002() throws Exception {
        mockMvc.perform(post("/assets")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(VALID_JSON))
                .andExpect(status().isCreated());

        mockMvc.perform(post("/assets")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(VALID_JSON))
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.code").value("AST-002"))
                .andExpect(jsonPath("$.status").value(409));
    }

    @Test
    @DisplayName("DELETE /assets/{id} with non-existent id returns 404 and code DEL-001")
    void delete_notFound_returns404WithDel001() throws Exception {
        UUID nonExistentId = UUID.randomUUID();

        mockMvc.perform(delete("/assets/{id}", nonExistentId))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.code").value("DEL-001"))
                .andExpect(jsonPath("$.status").value(404));
    }
}
