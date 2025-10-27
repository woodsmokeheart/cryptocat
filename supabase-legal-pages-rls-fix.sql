-- Добавляем политики для операций INSERT, UPDATE, DELETE
-- Поскольку мы не используем service role в API routes,
-- нужно добавить политики для аутентифицированных пользователей

-- Policy: Allow authenticated users to insert legal pages
CREATE POLICY "Allow authenticated users to insert legal pages" ON legal_pages
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policy: Allow authenticated users to update legal pages
CREATE POLICY "Allow authenticated users to update legal pages" ON legal_pages
  FOR UPDATE
  TO authenticated
  USING (true);

-- Policy: Allow authenticated users to delete legal pages
CREATE POLICY "Allow authenticated users to delete legal pages" ON legal_pages
  FOR DELETE
  TO authenticated
  USING (true);

