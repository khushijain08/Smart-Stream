package com.SmartStream.payloads;

import lombok.*;

import java.time.LocalDateTime;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DocumentDTO {

    private Long id;
    private String title;
    private String body;
    private LocalDateTime createdDate;
    private String createdBy;
}
