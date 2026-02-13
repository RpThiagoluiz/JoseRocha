package com.challenge.assets;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * Verifies that the application context loads. Uses H2 in-memory (profile "test")
 * so it does not require Docker. For full integration tests with PostgreSQL, use
 * {@link AbstractIntegrationTest} (requires Docker/Testcontainers).
 */
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
class AssetsManagerApplicationTest {

    @Test
    void contextLoads() {
        assertThat(Boolean.TRUE).isTrue();
    }
}
