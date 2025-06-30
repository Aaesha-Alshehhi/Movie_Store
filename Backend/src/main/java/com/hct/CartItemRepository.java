package com.hct;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CartItemRepository extends JpaRepository<CartItem, Long>{

	List<CartItem> findByAccount(Account account);
}
