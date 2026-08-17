package com.example.employee.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

import com.example.employee.dto.EmployeeRequestDTO;
import com.example.employee.dto.EmployeeResponseDTO;
import com.example.employee.service.EmployeeService;

@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    private final EmployeeService employeeService;

    // Constructor Injection
    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }


    // =====================================================
    // CREATE EMPLOYEE
    // ADMIN ONLY
    // =====================================================

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<EmployeeResponseDTO> createEmployee(
            @Valid @RequestBody EmployeeRequestDTO requestDTO) {

        EmployeeResponseDTO response =
                employeeService.createEmployee(requestDTO);

        return new ResponseEntity<>(
                response,
                HttpStatus.CREATED
        );
    }


    // =====================================================
    // GET ALL EMPLOYEES
    // ADMIN + USER
    // =====================================================

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<List<EmployeeResponseDTO>> getAllEmployees() {

        List<EmployeeResponseDTO> employees =
                employeeService.getAllEmployees();

        return ResponseEntity.ok(employees);
    }


    // =====================================================
    // GET EMPLOYEE BY ID
    // ADMIN + USER
    // =====================================================

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<EmployeeResponseDTO> getEmployeeById(
            @PathVariable Long id) {

        EmployeeResponseDTO employee =
                employeeService.getEmployeeById(id);

        return ResponseEntity.ok(employee);
    }


    // =====================================================
    // UPDATE EMPLOYEE
    // ADMIN ONLY
    // =====================================================

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<EmployeeResponseDTO> updateEmployee(
            @PathVariable Long id,
            @Valid @RequestBody EmployeeRequestDTO requestDTO) {

        EmployeeResponseDTO updatedEmployee =
                employeeService.updateEmployee(
                        id,
                        requestDTO
                );

        return ResponseEntity.ok(updatedEmployee);
    }


    // =====================================================
    // DELETE EMPLOYEE
    // ADMIN ONLY
    // =====================================================

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteEmployee(
            @PathVariable Long id) {

        employeeService.deleteEmployee(id);

        return ResponseEntity.noContent().build();
    }
}