package com.lingo.lingoalpha2_0.exception;

import java.util.List;

public record APIErrorResponse(
        int status,
        String message,
        List<String> errors
) {
}
