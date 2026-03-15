package com.mahima.TrackIt.service;

import com.mahima.TrackIt.model.Expense;
import com.mahima.TrackIt.model.User;
import com.mahima.TrackIt.repository.ExpenseRepository;
import com.mahima.TrackIt.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExpenseService {

    private final ExpenseRepository expenseRepository;
    private final UserRepository userRepository;

    public ExpenseService(ExpenseRepository expenseRepository,
                          UserRepository userRepository) {
        this.expenseRepository = expenseRepository;
        this.userRepository = userRepository;
    }

    public Expense addExpense(Long userId, Expense expense) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        expense.setUser(user);

        return expenseRepository.save(expense);
    }

    public List<Expense> getUserExpenses(Long userId) {
        return expenseRepository.findByUserId(userId);
    }
    public Expense updateExpense(Long expenseId, Expense updatedExpense) {

        Expense expense = expenseRepository.findById(expenseId)
                .orElseThrow(() -> new RuntimeException("Expense not found"));

        expense.setAmount(updatedExpense.getAmount());
        expense.setCategory(updatedExpense.getCategory());
        expense.setDescription(updatedExpense.getDescription());
        expense.setDate(updatedExpense.getDate());

        return expenseRepository.save(expense);
    }
    public void deleteExpense(Long expenseId) {

        Expense expense = expenseRepository.findById(expenseId)
                .orElseThrow(() -> new RuntimeException("Expense not found"));

        expenseRepository.delete(expense);
    }

}
