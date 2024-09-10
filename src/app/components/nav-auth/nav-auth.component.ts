import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FlowbiteService } from '../../core/services/flowbite/flowbite.service';
import { NgIf, isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';


@Component({
  selector: 'app-nav-auth',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgIf ,],
  templateUrl: './nav-auth.component.html',
  styleUrls: ['./nav-auth.component.scss']
})
export class NavAuthComponent implements OnInit {
  darkMode = false;
  constructor(
    private _flowbiteService: FlowbiteService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this._flowbiteService.loadFlowbite(flowbite => {});

    if (isPlatformBrowser(this.platformId)) {
      this.darkMode = localStorage.getItem('theme') === 'dark';
      this.updateTheme();
    }
  }

  toggleTheme() {
    this.darkMode = !this.darkMode;
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('theme', this.darkMode ? 'dark' : 'light');
    }
    this.updateTheme();
  }

  private updateTheme() {
    const root = document.documentElement;
    if (this.darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }

}

