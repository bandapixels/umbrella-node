export class JwtStatus {
  static access(): string {
    return 'ACCESS';
  }

  static refresh(): string {
    return 'REFRESH';
  }
}
