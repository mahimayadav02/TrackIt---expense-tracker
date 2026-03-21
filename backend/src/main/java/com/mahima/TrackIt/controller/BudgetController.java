package com.mahima.TrackIt.controller;

import com.mahima.TrackIt.model.Budget;
import com.mahima.TrackIt.repository.BudgetRepository;
import com.mahima.TrackIt.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/budgets")
@CrossOrigin(origins = "http://localhost:3001")
public class BudgetController {

    @Autowired
    private BudgetRepository budgetRepository;

    @Autowired
    private UserRepository userRepository;

    // ✅ ADD BUDGET
    @PostMapping("/{userId}")
    public Budget addBudget(@PathVariable Long userId, @RequestBody Budget budget) {
        budget.setUser(userRepository.findById(userId).orElse(null));
        return budgetRepository.save(budget);
    }

    // ✅ GET ALL BUDGETS OF USER
    @GetMapping("/{userId}")
    public List<Budget> getBudgets(@PathVariable Long userId) {
        return budgetRepository.findByUserId(userId);
    }

    @DeleteMapping("/{id}")
    public void deleteBudget(@PathVariable Long id) {
        budgetRepository.deleteById(id);
    }
}