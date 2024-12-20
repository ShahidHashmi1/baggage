import { Component } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { Profile } from '../../models/profile.model';
import { Club } from '../../models/club.model';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  profiles = this.profileService.getProfiles();
  selectedProfile: Profile | null = null;
  staticClubs: Club[] = [
    { name: 'Driver', distance: 0 },
    { name: 'Wood', distance: 0 },
    { name: '2 Wood', distance: 0 },
    { name: '3 Wood', distance: 0 },
    { name: '5 Wood', distance: 0 },
    { name: '7 Wood', distance: 0 },
    { name: '2 Iron', distance: 0 },
    { name: '3 Iron', distance: 0 },
    { name: '4 Iron', distance: 0 },
    { name: '5 Iron', distance: 0 },
    { name: '6 Iron', distance: 0 },
    { name: '7 Iron', distance: 0 },
    { name: '8 Iron', distance: 0 },
    { name: '9 Iron', distance: 0 },
    { name: '2 Hybrid', distance: 0 },
    { name: '3 Hybrid', distance: 0 },
    { name: '4 Hybrid', distance: 0 },
    { name: '5 Hybrid', distance: 0 },
    { name: 'Hybrid', distance: 0 },
    { name: 'Sand Wedge', distance: 0 },
    { name: 'Gap Wedge', distance: 0 },
    { name: 'Lob Wedge', distance: 0 },
    { name: 'Pitching Wedge', distance: 0 },
    { name: '50°', distance: 0 },
    { name: '52°', distance: 0 },
    { name: '54°', distance: 0 },
    { name: '56°', distance: 0 },
    { name: '58°', distance: 0 },
    { name: '60°', distance: 0 },
  ];

  constructor(private profileService: ProfileService) {}

  addProfile(name: string): void {
    const newProfile: Profile = {
      id: this.profiles.length + 1,
      name,
      bag: [],
    };
    this.profileService.addProfile(newProfile);
  }

  selectProfile(profile: Profile): void {
    this.selectedProfile = profile;
  }

  addToBag(club: Club): void {
    if (this.selectedProfile) {
      this.selectedProfile.bag.push({ ...club });
    }
  }

  updateDistance(index: number, distance: number): void {
    if (this.selectedProfile) {
      this.selectedProfile.bag[index].distance = distance;
    }
  }
}