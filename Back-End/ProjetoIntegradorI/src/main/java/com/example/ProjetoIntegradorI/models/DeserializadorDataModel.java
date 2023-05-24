package com.example.ProjetoIntegradorI.models;

import com.fasterxml.jackson.core.JsonGenerator;
        import com.fasterxml.jackson.core.JsonParser;
        import com.fasterxml.jackson.core.JsonProcessingException;
        import com.fasterxml.jackson.databind.DeserializationContext;
        import com.fasterxml.jackson.databind.JsonDeserializer;
        import com.fasterxml.jackson.databind.JsonSerializer;
        import com.fasterxml.jackson.databind.SerializerProvider;
        import org.springframework.boot.jackson.JsonComponent;

        import java.io.IOException;
        import java.text.ParseException;
        import java.text.SimpleDateFormat;
        import java.util.Date;

@JsonComponent
public class DeserializadorDataModel {

    public static class Serializer extends JsonSerializer<Date> {

        private static final SimpleDateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy'T'HH:mm:ss.SSSZ");

        @Override
        public void serialize(Date value, JsonGenerator gen, SerializerProvider serializers) throws IOException {
            String formattedDate = dateFormat.format(value);
            gen.writeString(formattedDate);
        }
    }

    public static class Deserializer extends JsonDeserializer<Date> {

        private static final SimpleDateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy'T'HH:mm:ss.SSSZ");

        @Override
        public Date deserialize(JsonParser p, DeserializationContext ctxt) throws IOException, JsonProcessingException {
            String date = p.getText();
            try {
                return dateFormat.parse(date);
            } catch (ParseException e) {
                throw new RuntimeException(e);
            }
        }
    }
}
