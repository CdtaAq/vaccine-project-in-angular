package com.vaccination.controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import com.vaccination.repo.AppointmentRepository;
import com.vaccination.repo.UserRepository;
import java.util.*;
import java.time.*;
import java.time.format.DateTimeFormatter;

@RestController
@RequestMapping("/api/reports")
public class ReportsController {
  @Autowired AppointmentRepository apptRepo;
  @Autowired UserRepository userRepo;

  @GetMapping("/doses-per-day")
  public List<Map<String,Object>> dosesPerDay(){
    // naive: group appointments by date
    var all = apptRepo.findAll();
    Map<String,Integer> map = new TreeMap<>();
    DateTimeFormatter fmt = DateTimeFormatter.ofPattern("yyyy-MM-dd");
    for(var a: all){
      String d = a.getAppointmentDate().toLocalDate().format(fmt);
      map.put(d, map.getOrDefault(d,0)+1);
    }
    List<Map<String,Object>> out = new ArrayList<>();
    map.forEach((k,v) -> out.add(Map.of("date", k, "count", v)));
    return out;
  }

  @GetMapping("/population-coverage")
  public Map<String,Object> populationCoverage(){
    long total = userRepo.count();
    long vaccinated = apptRepo.countByStatus("COMPLETED");
    return Map.of("total", total, "vaccinated", vaccinated);
  }

  @GetMapping("/age-gender")
  public Map<String,Object> ageGender(){
    // age groups: 0-17,18-25,26-35,36-50,51+
    var users = userRepo.findAll();
    Map<String,Integer> age = new LinkedHashMap<>();
    age.put("0-17",0); age.put("18-25",0); age.put("26-35",0); age.put("36-50",0); age.put("51+",0);
    Map<String,Integer> gender = new LinkedHashMap<>();
    gender.put("Male",0); gender.put("Female",0); gender.put("Other",0);

    for(var u: users){
      if(u.getAge() != null){
        int a = u.getAge();
        if(a <= 17) age.put("0-17", age.get("0-17")+1);
        else if(a <=25) age.put("18-25", age.get("18-25")+1);
        else if(a <=35) age.put("26-35", age.get("26-35")+1);
        else if(a <=50) age.put("
