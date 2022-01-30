interface RectangularArea {
  topLeft: number;
  bottomRight: number;
}

export abstract class MyGraphicsPrimitive2D {
  abstract topLeft: number;
  abstract bottomRight: number;

  moveRectangular(offset: number): RectangularArea {
    return {
      topLeft: this.topLeft + offset,
      bottomRight: this.bottomRight + offset
    };

  }
}

export abstract class MyAreaPrimitive2D extends MyGraphicsPrimitive2D {
  area(a: number, b?: number): number {
    return b ? a * b : Math.PI * Math.pow(a, 2)
  }
}

export class MyCircle extends MyAreaPrimitive2D {
  constructor(
    public center: number,
    public radius: number,
    public topLeft: number = center,
    public bottomRight: number = radius,
  ) {
    super();
  }

  area(): number {
    return super.area(this.radius);
  }

  move(offset: number): RectangularArea {
    return super.moveRectangular(offset);
  }
}

class MyRectangle extends MyAreaPrimitive2D {
  constructor(
    public width: number,
    public height: number,
    public topLeft: number = width,
    public bottomRight: number = height,
  ) {
    super()
  }

  area(): number {
    return super.area(this.width, this.height);
  }

  move(offset: number): RectangularArea {
    return super.moveRectangular(offset);
  }
}


