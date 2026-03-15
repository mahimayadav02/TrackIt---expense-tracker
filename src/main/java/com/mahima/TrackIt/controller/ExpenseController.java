package com.mahima.TrackIt.controller;

import com.mahima.TrackIt.model.Expense;
import com.mahima.TrackIt.service.ExpenseService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/expenses")
public class ExpenseController {

    private final ExpenseService expenseService;

    public ExpenseController(ExpenseService expenseService) {
        this.expenseService = expenseService;
    }

    // Add Expense
    @PostMapping("/{userId}")
    public Expense addExpense(@PathVariable Long userId,
                              @RequestBody Expense expense) {
        return expenseService.addExpense(userId, expense);
    }

    // Get All Expenses of User
    @GetMapping("/{userId}")
    public List<Expense> getExpenses(@PathVariable Long userId) {
        return expenseService.getUserExpenses(userId);
    }
    @PutMapping("/{expenseId}")
    public Expense updateExpense(@PathVariable Long expenseId,
                                 @RequestBody Expense expense) {
        return expenseService.updateExpense(expenseId, expense);
    }
    @DeleteMapping("/{expenseId}")
    public String deleteExpense(@PathVariable Long expenseId) {
        expenseService.deleteExpense(expenseId);
        return "Expense deleted successfully";
    }

}
