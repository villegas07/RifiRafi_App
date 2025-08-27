// Tests básicos de utilidades
describe('Utility Functions', () => {
  test('should format time correctly', () => {
    const formatTime = (milliseconds) => {
      const hours = Math.floor(milliseconds / 3600000);
      const minutes = Math.floor((milliseconds % 3600000) / 60000);
      const seconds = Math.floor((milliseconds % 60000) / 1000);
      const ms = Math.floor(milliseconds % 1000);
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${ms.toString().padStart(3, '0')}`;
    };

    expect(formatTime(65000)).toBe('00:01:05.000');
    expect(formatTime(1500)).toBe('00:00:01.500');
    expect(formatTime(0)).toBe('00:00:00.000');
  });

  test('should generate initials correctly', () => {
    const getInitials = (name) => {
      if (!name) return 'U';
      return name
        .split(' ')
        .map(word => word.charAt(0).toUpperCase())
        .slice(0, 2)
        .join('');
    };

    expect(getInitials('Juan Pérez')).toBe('JP');
    expect(getInitials('María')).toBe('M');
    expect(getInitials('')).toBe('U');
    expect(getInitials(null)).toBe('U');
  });

  test('should format points correctly', () => {
    const formatPoints = (points) => points || 0;

    expect(formatPoints(150)).toBe(150);
    expect(formatPoints(0)).toBe(0);
    expect(formatPoints(null)).toBe(0);
    expect(formatPoints(undefined)).toBe(0);
  });

  test('should get display name correctly', () => {
    const getDisplayName = (user, fallback = 'Usuario') => {
      return user?.firstName || user?.name || user?.displayName || fallback;
    };

    expect(getDisplayName({ firstName: 'Juan' })).toBe('Juan');
    expect(getDisplayName({ name: 'María' })).toBe('María');
    expect(getDisplayName({ displayName: 'Pedro' })).toBe('Pedro');
    expect(getDisplayName(null, 'Usuario')).toBe('Usuario');
    expect(getDisplayName({})).toBe('Usuario');
  });

  test('should validate API response', () => {
    const formatResponse = (status, data) => {
      return status === 200 
        ? { success: true, data }
        : { success: false, error: 'API Error' };
    };

    expect(formatResponse(200, { name: 'Juan' })).toEqual({
      success: true,
      data: { name: 'Juan' }
    });

    expect(formatResponse(400, null)).toEqual({
      success: false,
      error: 'API Error'
    });
  });
});