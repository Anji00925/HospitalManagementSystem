//package com.example.demo.service;
//
//import com.example.demo.entity.Appointment;
//import com.example.demo.repository.AppointmentRepository;
//import org.springframework.data.domain.Page;
//import org.springframework.data.domain.PageRequest;
//import org.springframework.data.domain.Sort;
//import org.springframework.stereotype.Service;
//
//@Service
//public class AppointmentService {
//
//    private final AppointmentRepository repository;
//
//    public AppointmentService(AppointmentRepository repository) {
//        this.repository = repository;
//    }
//
//    public Page<Appointment> getAll(
//            int page,
//            int size,
//            String sortBy,
//            String direction
//    ) {
//        Sort sort = direction.equalsIgnoreCase("desc")
//                ? Sort.by(sortBy).descending()
//                : Sort.by(sortBy).ascending();
//
//        return repository.findAll(PageRequest.of(page, size, sort));
//    }
//}

package com.example.demo.service;

import com.example.demo.entity.Appointment;
import com.example.demo.repository.AppointmentRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class AppointmentService {

    private final AppointmentRepository repository;

    public AppointmentService(AppointmentRepository repository) {
        this.repository = repository;
    }

    public Page<Appointment> getAll(
            int page,
            int size,
            String sortBy,
            String direction
    ) {
        Sort sort = direction.equalsIgnoreCase("desc")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();

        return repository.findAll(PageRequest.of(page, size, sort));
    }
}
