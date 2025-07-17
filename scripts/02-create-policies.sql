-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone" ON profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Posts policies
CREATE POLICY "Published posts are viewable by everyone" ON posts
  FOR SELECT USING (status = 'published' OR author_id = auth.uid());

CREATE POLICY "Users can insert their own posts" ON posts
  FOR INSERT WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can update their own posts" ON posts
  FOR UPDATE USING (auth.uid() = author_id);

CREATE POLICY "Users can delete their own posts" ON posts
  FOR DELETE USING (auth.uid() = author_id);

-- Post likes policies
CREATE POLICY "Post likes are viewable by everyone" ON post_likes
  FOR SELECT USING (true);

CREATE POLICY "Users can like posts" ON post_likes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can unlike posts" ON post_likes
  FOR DELETE USING (auth.uid() = user_id);

-- Comments policies
CREATE POLICY "Comments are viewable by everyone" ON comments
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own comments" ON comments
  FOR INSERT WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can update their own comments" ON comments
  FOR UPDATE USING (auth.uid() = author_id);

CREATE POLICY "Users can delete their own comments" ON comments
  FOR DELETE USING (auth.uid() = author_id);

-- Events policies
CREATE POLICY "Events are viewable by everyone" ON events
  FOR SELECT USING (true);

CREATE POLICY "Users can create events" ON events
  FOR INSERT WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update their own events" ON events
  FOR UPDATE USING (auth.uid() = created_by);

-- Event attendees policies
CREATE POLICY "Event attendees are viewable by everyone" ON event_attendees
  FOR SELECT USING (true);

CREATE POLICY "Users can manage their own attendance" ON event_attendees
  FOR ALL USING (auth.uid() = user_id);

-- Wiki pages policies
CREATE POLICY "Published wiki pages are viewable by everyone" ON wiki_pages
  FOR SELECT USING (status = 'published');

CREATE POLICY "Authenticated users can create wiki pages" ON wiki_pages
  FOR INSERT WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Authenticated users can update wiki pages" ON wiki_pages
  FOR UPDATE WITH CHECK (auth.uid() IS NOT NULL);

-- Wiki history policies
CREATE POLICY "Wiki history is viewable by everyone" ON wiki_page_history
  FOR SELECT USING (true);

CREATE POLICY "System can insert wiki history" ON wiki_page_history
  FOR INSERT WITH CHECK (true);
