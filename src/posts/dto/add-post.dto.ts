export class AddPostDto {
  readonly title: string;
  readonly text: string;
  readonly picture: {
    readonly fileName: string;
    readonly width: number;
    readonly height: number;
  };
}
