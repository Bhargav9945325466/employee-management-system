package com.example.employee.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.employee.dto.EmployeeRequestDTO;
import com.example.employee.dto.EmployeeResponseDTO;
import com.example.employee.entity.Employee;
import com.example.employee.exception.EmployeeNotFoundException;
import com.example.employee.repository.EmployeeRepository;

@Service
public class EmployeeService {

    private final EmployeeRepository employeeRepository;

    // Constructor Injection
    public EmployeeService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    // CREATE
    public EmployeeResponseDTO createEmployee(EmployeeRequestDTO requestDTO) {

        // Convert Request DTO → Entity
        Employee employee = new Employee();

        employee.setFirstName(requestDTO.getFirstName());
        employee.setLastName(requestDTO.getLastName());
        employee.setEmail(requestDTO.getEmail());
        employee.setDepartment(requestDTO.getDepartment());
        employee.setSalary(requestDTO.getSalary());

        // Save Entity into MySQL
        Employee savedEmployee = employeeRepository.save(employee);

        // Convert Entity → Response DTO
        return convertToResponseDTO(savedEmployee);
    }

    // GET ALL
    public List<EmployeeResponseDTO> getAllEmployees() {

        return employeeRepository.findAll()
                .stream()
                .map(this::convertToResponseDTO)
                .toList();
    }

    // GET BY ID
    public EmployeeResponseDTO getEmployeeById(Long id) {

        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() ->
                        new EmployeeNotFoundException(
                                "Employee not found with id: " + id
                        )
                );

        return convertToResponseDTO(employee);
    }

    // UPDATE
    public EmployeeResponseDTO updateEmployee(
            Long id,
            EmployeeRequestDTO requestDTO) {

        Employee existingEmployee = employeeRepository.findById(id)
                .orElseThrow(() ->
                        new EmployeeNotFoundException(
                                "Employee not found with id: " + id
                        )
                );

        existingEmployee.setFirstName(requestDTO.getFirstName());
        existingEmployee.setLastName(requestDTO.getLastName());
        existingEmployee.setEmail(requestDTO.getEmail());
        existingEmployee.setDepartment(requestDTO.getDepartment());
        existingEmployee.setSalary(requestDTO.getSalary());

        Employee updatedEmployee =
                employeeRepository.save(existingEmployee);

        return convertToResponseDTO(updatedEmployee);
    }

    // DELETE
    public void deleteEmployee(Long id) {

        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() ->
                        new EmployeeNotFoundException(
                                "Employee not found with id: " + id
                        )
                );

        employeeRepository.delete(employee);
    }

    // Entity → Response DTO
    private EmployeeResponseDTO convertToResponseDTO(Employee employee) {

        return new EmployeeResponseDTO(
                employee.getId(),
                employee.getFirstName(),
                employee.getLastName(),
                employee.getEmail(),
                employee.getDepartment(),
                employee.getSalary()
        );
    }
}