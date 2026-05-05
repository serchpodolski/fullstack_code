const { test, expect, describe, beforeEach } = require('@playwright/test')
const { loginWith, createBook, seedDatabase } = require('./helper')

describe('Library app', () => {
  beforeEach(async ({ page, request }) => {
    await seedDatabase(request)
    await page.goto('/')
  })

  
  describe('Login', () => {
    test('login button is shown when not logged in', async ({ page }) => {
      await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
      await expect(
        page.getByRole('button', { name: 'add book' }),
      ).not.toBeVisible()
      await expect(
        page.getByRole('button', { name: 'recommend' }),
      ).not.toBeVisible()
      await expect(
        page.getByRole('button', { name: 'logout' }),
      ).not.toBeVisible()
    })
    
    test('login succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'testuser', 'secret')
      
      await expect(page.getByRole('button', { name: 'add book' })).toBeVisible()
      await expect(
        page.getByRole('button', { name: 'recommend' }),
      ).toBeVisible()
      await expect(page.getByRole('button', { name: 'logout' })).toBeVisible()
      await expect(
        page.getByRole('button', { name: 'login' }),
      ).not.toBeVisible()
    })
    
    test('login fails with wrong password', async ({ page }) => {
      await loginWith(page, 'testuser', 'wrong')
      
      await expect(page.getByText(/wrong/i)).toBeVisible()
    })
  })
  
  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'testuser', 'secret')
      await expect(page.getByRole('button', { name: 'logout' })).toBeVisible()
    })
    
    test('front page shows authors by default', async ({ page }) => {
      await expect(page.getByText('Loading...')).not.toBeVisible()
      await expect(page.getByRole('heading', { name: 'authors' })).toBeVisible()
      await expect(page.getByRole('cell', { name: 'Robert Martin', exact: true })).toBeVisible()
      await expect(page.getByRole('cell', { name: 'Martin Fowler', exact: true })).toBeVisible()
      await expect(page.getByRole('cell', { name: 'Fyodor Dostoevsky', exact: true })).toBeVisible()
    })
  
    test('books page shows all books', async ({ page }) => {
      await page.getByRole('button', { name: 'books' }).click()
      await expect(page.getByRole('heading', { name: 'books' })).toBeVisible()
      await expect(page.getByText('Clean Code')).toBeVisible()
      await expect(page.getByText('Crime and punishment')).toBeVisible()
      await expect(page.getByText('Refactoring, edition 2')).toBeVisible()
    })

    test('a new book can be added', async ({ page }) => {
      await createBook(page, {
        title: 'Test Book',
        author: 'Test Author',
        published: 2024,
        genres: ['test'],
      })

      await page.getByRole('button', { name: 'books' }).click()
      await expect(page.getByText('Test Book')).toBeVisible()
      await expect(page.getByText('Test Author')).toBeVisible()
    })

    test('author birth year can be updated', async ({ page }) => {
      await page.getByRole('button', { name: 'authors' }).click()
      await expect(
        page.getByRole('heading', { name: 'Edit DOB' }),
      ).toBeVisible()

      await page.locator('select[name="authors"]').selectOption('Martin Fowler')
      await page.getByLabel('born').fill('1965')
      await page.getByRole('button', { name: 'update author' }).click()

      const fowlerRow = page.locator('tr', { hasText: 'Martin Fowler' })
      await expect(fowlerRow.getByText('1965')).toBeVisible()
    })

    describe('Genre filtering', () => {
      beforeEach(async ({ page }) => {
        await page.getByRole('button', { name: 'books' }).click()
      })

      test('genre filter select is shown and contains genres', async ({ page }) => {
        const filterSelect = page.getByRole('combobox')
        await expect(filterSelect).toBeVisible()
        console.log(await page.getByRole('option').allInnerTexts())
        await expect(page.getByRole('option', { name: /refactoring/i })).toBeAttached()
        await expect(page.getByRole('option', { name: 'classic' })).toBeAttached()
        await expect(page.getByRole('option', { name: 'all' })).toBeAttached()
      })

      test('filtering by genre works', async ({ page }) => {
        const filterSelect = page.getByRole('combobox')
        await expect(filterSelect).toBeVisible()
        await filterSelect.selectOption('refactoring')

        await expect(page.getByText('in genre')).toBeVisible()
        await expect(page.getByText('Clean Code')).toBeVisible()
        await expect(page.getByText('Refactoring, edition 2')).toBeVisible()
        await expect(page.getByText('Refactoring to patterns')).toBeVisible()
      })

      test('all genres button shows all books', async ({ page }) => {
        const filterSelect = page.getByRole('combobox')
        await expect(filterSelect).toBeVisible()
        await filterSelect.selectOption('all')

        await expect(page.getByText('in genre')).not.toBeVisible()
        await expect(page.getByText('Clean Code')).toBeVisible()
        await expect(page.getByText('Crime and punishment')).toBeVisible()
        await expect(page.getByText('Clean Code')).toBeVisible()
      })
    })

    test('recommendations shows books in favorite genre', async ({ page }) => {
      await page.getByRole('button', { name: 'recommend' }).click()
      console.log('clicked')

      await expect(
        page.getByRole('heading', { name: 'Recommendations' }),
      ).toBeVisible()
      await expect(page.getByText('Books in your favorite genre')).toBeVisible()
      await expect(page.getByText('Refactoring', { exact: true })).toBeVisible()
      await expect(page.getByText('Clean Code')).toBeVisible()
      await expect(page.getByText('Crime and punishment')).not.toBeVisible()
    })

    test('new book appears in genre filtered view', async ({ page }) => {
      await createBook(page, {
        title: 'Classic Test Book',
        author: 'Classic Author',
        published: 2024,
        genres: ['classic'],
      })

      await page.getByRole('button', { name: 'books' }).click()
      const filterSelect = page.getByRole('combobox')
      await expect(filterSelect).toBeVisible()
      await filterSelect.selectOption('classic')

      await expect(page.getByText('Classic Test Book')).toBeVisible()
      await expect(page.getByText('Crime and punishment')).toBeVisible()
    })
  })
})
