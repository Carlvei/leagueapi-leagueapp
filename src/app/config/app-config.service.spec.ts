import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import {
  AppConfigService,
  AppConfig,
  SummonersConfig,
  AuthenticationConfig,
} from './app-config.service';

describe('AppConfigService', () => {
  let service: AppConfigService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AppConfigService],
    });
    service = TestBed.inject(AppConfigService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  // It is used to perform any necessary cleanup or verification step
  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('loadAppConfig', () => {
    it('should load the app config', async () => {
      // given
      const appConfig: AppConfig = {
        apiBaseUrl: 'http://localhost:8080',
        gamedataServiceBaseUrl: '/gamedata',
        authServiceBaseUrl: '/auth',
        summoners: {} as SummonersConfig,
        authentication: {} as AuthenticationConfig,
      };

      // when
      service.loadAppConfig().then(() => {
        // then
        expect(service.appConfig).toEqual(appConfig);
      });

      const request = httpMock.expectOne('/assets/config/appconfig.json');
      request.flush(appConfig);
    });
  });

  describe('apiBaseUrl', () => {
    it('should return the correct API base URL', () => {
      // given
      service.appConfig = {
        apiBaseUrl: 'http://localhost:8080',
        gamedataServiceBaseUrl: '',
        authServiceBaseUrl: '',
        summoners: {} as SummonersConfig,
        authentication: {} as AuthenticationConfig,
      };

      // when
      const apiBaseUrl = service.apiBaseUrl;

      // then
      expect(apiBaseUrl).toBe('http://localhost:8080');
    });
  });

  describe('summonersUrl', () => {
    it('should return the correct summoners URL', () => {
      // given
      service.appConfig = {
        apiBaseUrl: 'http://localhost:8080',
        gamedataServiceBaseUrl: '/gamedata',
        authServiceBaseUrl: '',
        summoners: {
          summonersEndpoint: '/summoners',
          matchhistoryEndpoint: '/matchhistory',
        } as SummonersConfig,
        authentication: {} as AuthenticationConfig,
      };

      // when
      const summonersUrl = service.summonersUrl;

      // then
      expect(summonersUrl).toBe('http://localhost:8080/gamedata/summoners');
    });
  });

  // TODO: add tests for the rest of the http calls
  describe('matchhistoryUrl', () => {
    it('should...', () => {
      // Write a test for matchhistoryUrl
      // Given
      // When
      // Then
    });
  });

  describe('authenticationConfig', () => {
    it('should...', () => {
      // Write a test for authenticationConfig
      // Given
      // When
      // Then
    });
  });

  describe('loginUrl', () => {
    it('should...', () => {
      // Write a test for loginUrl
      // Given
      // When
      // Then
    });
  });

  describe('signUpUrl', () => {
    it('should...', () => {
      // Write a test for signUpUrl
      // Given
      // When
      // Then
    });
  });

  describe('accessTokenCookieName', () => {
    it('should...', () => {
      // Write a test for accessTokenCookieName
      // Given
      // When
      // Then
    });
  });
});
