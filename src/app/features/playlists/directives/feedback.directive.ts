import { Directive, HostListener, OnInit, ComponentRef, Input, ElementRef, EventEmitter, Output } from '@angular/core';
import { OverlayRef, Overlay, OverlayPositionBuilder } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { PlaylistFeedbackComponent } from '../components/playlist-feedback/playlist-feedback.component';

@Directive({
  selector: '[shufFeedback]'
})
export class FeedbackDirective implements OnInit {

  @Input('shufFeedback') playlistId ;

  @Output() ratingSelected = new EventEmitter();

  private overlayRef: OverlayRef;

  constructor(
    private overlayPositionBuilder: OverlayPositionBuilder,
    private elementRef: ElementRef,
    private overlay: Overlay
  ) { }

  ngOnInit() {
    const positionStrategy = this.overlayPositionBuilder
      .flexibleConnectedTo(this.elementRef)
      .withPositions([{
        originX: 'center',
        originY: 'center',
        overlayX: 'center',
        overlayY: 'center',
      }]);
    this.overlayRef = this.overlay.create({ positionStrategy, hasBackdrop: true, backdropClass: 'shuf-transparent' });
  }

  @HostListener('click')
  show() {
    const tooltipPortal = new ComponentPortal(PlaylistFeedbackComponent);
    const tooltipRef: ComponentRef<PlaylistFeedbackComponent> = this.overlayRef.attach(tooltipPortal);
    this.overlayRef.backdropClick().subscribe(() => this.hide());

    tooltipRef.instance.playlistId = this.playlistId;
    tooltipRef.instance.selectRating = index => this.ratingSelected.emit(index);
  }

  hide() {
    this.overlayRef.detach();
  }
}
