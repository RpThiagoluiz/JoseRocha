
package com.challenge.assets.dto.error;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Standard API error response body.
 *
 * @param status   HTTP status code
 * @param code     application error code
 * @param message  human-readable message
 * @param timestamp time of the error
 * @param details  optional validation or field errors (e.g. for 400)
 */
public record ApiErrorResponse(
        int status,
        String code,
        String message,
        LocalDateTime timestamp,
        List<ValidationError> details
) {
    /**
     * Single field validation error.
     *
     * @param field   field name (e.g. request property)
     * @param message validation message
     */
    public record ValidationError(String field, String message) {}
}
