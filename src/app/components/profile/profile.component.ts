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
    { name: 'Putter', distance: 0 },
    { name: 'Iron 7', distance: 0 },
    { name: 'Wedge', distance: 0 },
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