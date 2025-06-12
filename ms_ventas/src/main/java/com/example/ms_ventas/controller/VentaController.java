package com.example.ms_ventas.controller;

import com.example.ms_ventas.dto.VentaDTO;
import com.example.ms_ventas.service.VentaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ventas")
@RequiredArgsConstructor
public class VentaController {

    private final VentaService ventaService;

    @PostMapping
    public ResponseEntity<VentaDTO> registrarVenta(@RequestBody VentaDTO ventaDTO) {
        return ResponseEntity.ok(ventaService.registrarVenta(ventaDTO));
    }

    @GetMapping("/{id}")
    public ResponseEntity<VentaDTO> obtenerVenta(@PathVariable Long id) {
        return ResponseEntity.ok(ventaService.obtenerVentaPorId(id));
    }

    @GetMapping
    public ResponseEntity<List<VentaDTO>> listarVentas() {
        return ResponseEntity.ok(ventaService.listarVentas());
    }

    // ✅ Editar una venta
    @PutMapping("/{id}")
    public ResponseEntity<VentaDTO> actualizarVenta(@PathVariable Long id, @RequestBody VentaDTO ventaDTO) {
        ventaDTO.setId(id);  // aseguramos que el ID sea consistente
        return ResponseEntity.ok(ventaService.actualizarVenta(id, ventaDTO));

        // OJO: esta lógica usa el mismo método registrarVenta. Idealmente deberías tener una implementación separada si la lógica difiere.
    }

    // ✅ Eliminar una venta
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarVenta(@PathVariable Long id) {
        ventaService.eliminarVenta(id);
        return ResponseEntity.noContent().build(); // 204 No Content
    }
}
