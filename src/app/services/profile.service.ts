import { Injectable } from '@angular/core';
import { Profile } from '../models/profile.model';
import { Club } from '../models/club.model';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private profiles: Profile[] = [];

  getProfiles(): Profile[] {
    return this.profiles;
  }

  addProfile(profile: Profile): void {
    this.profiles.push(profile);
  }

  updateProfile(id: number, updatedBag: Club[]): void {
    const profile = this.profiles.find((p) => p.id === id);
    if (profile) {
      profile.bag = updatedBag;
    }
  }
}
