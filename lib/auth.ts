-- 기존 사용자를 관리자로 승격 (이메일 주소를 실제 관리자 이메일로 변경)
  UPDATE user_profiles
  SET role = 'admin'
  WHERE email = 'your-admin-email@example.com';