import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
// import { faHeart } from '@fortawesome/free-solid-svg-icons';
import confetti from 'canvas-confetti';


@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent implements OnInit {
  
  ngOnInit(): void {  
    const canvas = document.getElementById('confetti-canvas') as HTMLCanvasElement;
    const myConfetti = confetti.create(canvas, { resize: true, useWorker: true });

    const duration = 5 * 1000;
    const end = Date.now() + duration;
    const colors = ["#d60382", "#ee90c1"];

    const heartPath = "M462.3 62.7c-54.5-46.4-136-38.3-186.4 13.8l-11.9 12-11.9-12c-50.4-52.1-131.9-60.2-186.4-13.8-62 52.7-66.3 149.8-11.4 207.3l193.7 199.8c6.2 6.4 16.4 6.4 22.6 0l193.7-199.8c54.9-57.5 50.6-154.6-11.4-207.3z";
    const heart = confetti.shapeFromPath({ path: heartPath });

    const defaults = {
      origin: { y: 0.7 },
      colors: colors,
      shapes: [heart],
      scalar: 1.7,
      startVelocity: 30,
      spread: 360,
      ticks: 160,
      zIndex: 0
    };

    function randomInRange(min: number, max: number): number {
      return Math.random() * (max - min) + min;
    }

    const frame = () => {
      const timeLeft = end - Date.now();
  
      if (timeLeft <= 0) {
        canvas.remove();
        return
      };

      myConfetti({
        ...defaults,
        particleCount: 50 * (timeLeft / duration),
        origin: {
          x: randomInRange(0.2, 0.8),
          y: Math.random() - 0.2,
        }
      });

      setTimeout(() => requestAnimationFrame(frame), 250);

    };

    frame();

  }

}
